import { Chart } from 'cdk8s';
import { Construct } from 'constructs';
import { ScaledObject, TriggerAuthentication } from './imports/keda.sh';

export interface KedaScaleObjProps {
  name: string;
  kind?: string;
  namespace?: string;
  replicas?: string;
};

export class KedaAirflowScaledObject extends Chart {
  constructor(scope: Construct, name: string, kedaProps: KedaScaleObjProps) {
    super(scope, name);

    const pgAuth = new TriggerAuthentication(this, 'KedaPostgresAuthentication', {
      metadata: {
        name: 'keda-airflow-postgresql-auth',
        namespace: 'airflow',
      },
      spec: {
        secretTargetRef: [{
          parameter: 'password',
          name: 'airflow-secret',
          key: 'postgresql-password',
        }],
      },
    });

    new ScaledObject(this, 'KedaDailyStartStop', {
      metadata: {
        name: kedaProps.name,
        namespace: kedaProps.namespace || undefined,
      },
      spec: {
        scaleTargetRef: {
          name: kedaProps.name,
          kind: kedaProps.kind || 'Deployment',
        },
        pollingInterval: 60,
        minReplicaCount: 2,
        maxReplicaCount: 12,
        triggers: [
          {
            type: 'cron',
            metadata: {
              timezone: 'Etc/UTC',
              start: '5 5 * * *',
              end: '55 4 * * *',
              desiredReplicas: kedaProps.replicas || '1',
            },
          },
          {
            type: 'cpu',
            metricType: 'Utilization',
            metadata: {
              value: '80',
            },
          },
          {
            type: 'postgresql',
            authenticationRef: {
              name: pgAuth.name,
            },
            metadata: {
              userName: 'airflow',
              passwordFromEnv: 'PG_PASSWORD',
              host: 'airflow-postgresql.airflow.svc.cluster.local',
              port: '5432',
              dbName: 'airflow',
              sslmode: 'disable',
              query: "SELECT ceil(COUNT(*)::decimal/16) FROM task_instance WHERE (state='running' OR state='queued') AND dag_id like '%run_all_reports%';",
              targetQueryValue: '1.5',
              metricName: 'backlog_process_count',
            },
          },
        ],
      },
    });
  }
}
import { App } from 'cdk8s';
import { KedaAirflowScaledObject } from './keda-airflow';

/**
 * Keda App with format file type and output dir
 */
const keda = new App({
  outputFileExtension: '.yaml',
  outdir: 'dist/keda',
});

/**
 * Keda scaler cron, cpu and postgresql
 */
new KedaAirflowScaledObject(keda, 'airflow-keda-so', { name: 'airflow', kind: 'StatefulSet' });
keda.synth();
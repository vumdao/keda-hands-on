import { cdk8s } from 'projen';
const project = new cdk8s.Cdk8sTypeScriptApp({
  cdk8sVersion: '2.3.33',
  defaultReleaseBranch: 'main',
  github: false,
  name: 'keda-hands-on',
  projenrcTs: true,

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
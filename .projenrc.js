const { cdk8s } = require('projen');
const project = new cdk8s.Cdk8sTypeScriptApp({
  cdk8sVersion: '1.0.0-beta.10',
  defaultReleaseBranch: 'master',
  name: 'keda-cdk8s',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
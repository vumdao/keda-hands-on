<p align="center">
  <a href="https://dev.to/vumdao">
    <img alt="Keda ScaledObject As Code Using CDK8S" src="images/cover.png" width="700" />
  </a>
</p>
<h1 align="center">
  <div><b>Keda ScaledObject As Code Using CDK8S</b></div>
</h1>

## Abstract
- [keda](https://keda.sh/) is Kubernetes Event-driven Autoscaling and it's been used wisely now. In this blog, it provides the way to create Keda scaledobject CRD as code using [CDK8S](https://cdk8s.io/) typescript.
- With importing Keda CRDs and using CDK8S you can create Keda scaledobjects using your familiar programming languages such as typescript as scale.

## Table Of Contents
 * [Pre-requisite](#Pre-requisite)
 * [Import Keda CRDs](#Import-Keda-CRDs)
 * [Write code](#Write-code)
 * [Build keda scaledobjects from code](#Build-keda-scaledobjects-from-code)
 * [Conclusion](#Conclusion)

---

## 🚀 **Pre-requisite** <a name="Pre-requisite"></a>
- Install typescript, node, and cdk8s as well as projen (optional) which is a tool of managing project configuration as code.
- [Getting started with cdk8s](https://cdk8s.io/docs/latest/getting-started/)

## 🚀 **Import Keda CRDs** <a name="Import-Keda-CRDs"></a>
- Keda does not provide its CRDs separately so we can found the manifest in GH release section. Here I import the current latest version of keda v2.8.0 and out the `imports` folder in `src/imports`

  ```
  ⚡ $ cdk8s import https://github.com/kedacore/keda/releases/download/v2.8.0/keda-2.8.0.yaml --output src/imports/
  ------------------------------------------------------------------------------------------------
  A new version 2.0.88 of cdk8s-cli is available (current 2.0.13).
  Run "npm install -g cdk8s-cli" to install the latest version on your system.
  For additional installation methods, see https://cdk8s.io/docs/latest/getting-started
  ------------------------------------------------------------------------------------------------
  Importing resources, this may take a few moments...
  keda.sh
    keda.sh/clustertriggerauthentication
    keda.sh/scaledjob
    keda.sh/scaledobject
    keda.sh/triggerauthentication
  ```

- Import result
  ```
  ⚡ $ tree src/imports/
  src/imports/
  └── keda.sh.ts

  0 directories, 1 file
  ```

## 🚀 **Write code** <a name="Write-code"></a>
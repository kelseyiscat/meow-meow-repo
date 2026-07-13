<!--
meow-meow-repo · GH Workflow index
Purpose: 5-line markdown explainer for .github/workflows/ci-test.yml
Super lightweight – renders natively on GitHub
-->

# 🐱 meow-meow-repo — GH Workflow

<!-- 1. Trigger — what starts CI -->
1. PR / manual run → `.github/workflows/ci-test.yml`
<!-- 2. Runners — ephemeral VMs, parallel jobs -->
2. `ubuntu-latest` runners, jobs parallel
<!-- 3. Success jobs — green checks ✅ -->
3. Green: `always-success`, `success-2`, `success-3`
<!-- 4. Failure jobs — red X, intentional -->
4. Red: `always-failure`, `failure-2`, `failure-3`
<!-- 5. Slow jobs — timeout / queue testing -->
5. Slow: 30s · 60s · 120s · 300s · 600s 😴

<!-- quick nav -->
[arena demo](./arena-clone/index.html)

<!--
GH Actions quick ref:
  on: pull_request / workflow_dispatch
  jobs: <name> → runs-on: ubuntu-latest → steps: run:
  status: success ✅ / failure ❌ / skipped ⏭️ / in_progress 🟡
  purr 🐾
-->

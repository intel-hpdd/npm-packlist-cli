# npm-packlist-cli

A way to list packaged files without running `npm pack`.

## usage

In the dir you want to view:

`npx npm-packlist-cli`

will pretty-print JSON output.

if you want to view make compatible output:

`npx npm-packlist-cli -- -o make`

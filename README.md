# Redlint [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMURL]: https://npmjs.org/package/redlint "npm"
[NPMIMGURL]: https://img.shields.io/npm/v/redlint.svg?style=flat&longCache=true
[BuildStatusURL]: https://github.com/putoutjs/printer/actions/workflows/nodejs.yml "Build Status"
[BuildStatusIMGURL]: https://github.com/putoutjs/printer/actions/workflows/nodejs.yml/badge.svg
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[CoverageURL]: https://coveralls.io/github/putoutjs/printer?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/putoutjs/printer/badge.svg?branch=master&service=github

> **Karna is the goddess of retribution, a strict and fair Judge in whose hands is the Book of Fates. In this book she records all the deeds and actions of people. Karna works together with the goddess Makosh. Makosh weaves the destinies of people in accordance with the records of the goddess Karna.**
>
> **(c) The Book of Kon, PoKon and ZaKon**

![image](https://github.com/putoutjs/redlint/assets/1573141/c990a94f-3ea5-42b0-a43f-42caadaad649)

What if **Filesystem** was a simple **JSON** file [`.filesystem.json`](https://github.com/putoutjs/redlint/blob/v2.0.0/.filesystem.json). What if you can transform **JSON** file with 🐊[**Putout**](https://github.com/coderaiser/putout) code transformer and this changes modify **Filesystem**?

What if I tell you it is possible? 😱 Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/0614c2da35a1864b59ac284f18656328/695a9960c401d4e8f6744f58eac591d8f9185235).

First time ever! Linter for your **Filesystem** 😏💾.

## Install

```
npm i redlint -g
```

## Choose

You can choose interactively when run `redlint`:

![image](https://github.com/putoutjs/redlint/assets/1573141/906061ba-a5b3-44be-a7ad-40464a9122f6)

## Scan

To scan your files use `redlint scan`:

<img width="718" alt="image" src="https://github.com/putoutjs/redlint/assets/1573141/58672a61-4408-4c1e-ab75-2fbcca7f225d">

## Convert

To convert file to **JSON** or **JavaScript** use:

![image](https://github.com/putoutjs/redlint/assets/1573141/2a2df8f7-ea3b-4158-b3f3-d30522dbdd7e)
![image](https://github.com/putoutjs/redlint/assets/1573141/847622e9-cfa5-47fd-9503-f526214dcf23)

## Fix

To fix your files use `redlint fix`:

<img width="244" alt="image" src="https://github.com/putoutjs/redlint/assets/1573141/3e9d2d3d-8d9c-4753-a2aa-4ca634d19526">

## Generate

You can also generate `.filesystem.json` file with `putout generate`.

## How to add a new rule?

To add new rule `create-file` located in plugin `custom` for **RedLint** write a new 🐊**Putout** rule [Scanner](https://github.com/coderaiser/putout/tree/master/packages/engine-runner#scanner). And add it to `.putout.json`:

```json
{
    "match": {
        ".filesystem": {
            "custom/create-file": "on"
        }
    },
    "plugins": ["custom"]
}
```

## Test

- ✅ [get fiture names from `index.spec.js`](https://putout.cloudcmd.io/#/gist/558b38ed5e5e662706f1b8a49a0157a1/8e188e99798246263dbf488b86dc250b8dfa1be3).
- ✅ [init fixture](https://putout.cloudcmd.io/#/gist/e7614e03b3292a210cfc63265718e955/13ccc3a90a8d9ff28f26474b107c5652928e8d0a);
- ✅ [read fixture](https://putout.cloudcmd.io/#/gist/f8ab318fa1963508322031483d988ad4/b152c5f796bfab9aa74594c847ddbd1f650efb83);
- ✅ [run plugin](https://putout.cloudcmd.io/#/gist/8e66e45753dbe9e746c797813eb2723a/9855f9aea57f345492c629c65d9972309d250a91);

## License

MIT

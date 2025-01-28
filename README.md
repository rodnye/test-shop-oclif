# shop oclif practice
A CLI developed in NodeJS and Typescript for practical purposes.

## Features
It's a product manager for a fictional store divided into sections.
- Get an add products to a section
- List all sections
- List all products in a section
- Remove a product from a section
- Remove a section
- Some interactive menus

## Tecnologies

| Library | Usage |
|---|---|
| `@oclif/core` | CLI Framework |  
| `@clack/prompts` | CLI Prompts |  
| `lowdb-js` | Json database manager  |

## Usage
  <!-- usage -->
```sh-session
$ git clone https://github.com/rodnye/test-shop-oclif.git
$ cd ./test-shop-oclif
```

```
$ ./bin/run.js COMMAND
running command...
$ ./bin/run.js (--version)
oclif-test/1.0.0 linux-x64 node-v20.17.0
$ ./bin/run.js --help [COMMAND]
USAGE
  $ ./bin/run.js COMMAND
...
```
<!-- usagestop -->

## Commands
  <!-- commands -->
* [`./bin/run.js add [PRODUCT]`](#binrunjs-add-product)
* [`./bin/run.js get [SECTION]`](#binrunjs-get-section)
* [`./bin/run.js list`](#binrunjs-list)
* [`./bin/run.js ls`](#binrunjs-ls)
* [`./bin/run.js remove product PRODUCT`](#binrunjs-remove-product-product)
* [`./bin/run.js remove section SECTION`](#binrunjs-remove-section-section)


## `./bin/run.js add [PRODUCT]`

Add a product to the database

```
USAGE
  $ ./bin/run.js add [PRODUCT] [-p <value>] [-s <value>]

ARGUMENTS
  PRODUCT  Product name

FLAGS
  -p, --price=<value>    Price of the product
  -s, --section=<value>  Section to be stored the product

DESCRIPTION
  Add a product to the database

EXAMPLES
  $ ./bin/run.js add chesse --price 30 --section a

  $ ./bin/run.js add "pineapple" --price 130 --section fruits
```

## `./bin/run.js get [SECTION]`

Show the products stored in the specified section

```
USAGE
  $ ./bin/run.js get [SECTION] [-t]

ARGUMENTS
  SECTION  Section to show products

FLAGS
  -t, --total  Show total price number of products

DESCRIPTION
  Show the products stored in the specified section

EXAMPLES
  $ ./bin/run.js get

  $ ./bin/run.js get vegetables

  $ ./bin/run.js get fruits --total
```

## `./bin/run.js list`

Get all section list

```
USAGE
  $ ./bin/run.js list

DESCRIPTION
  Get all section list

ALIASES
  $ ./bin/run.js ls
```

## `./bin/run.js ls`

Get all section list

```
USAGE
  $ ./bin/run.js ls

DESCRIPTION
  Get all section list

ALIASES
  $ ./bin/run.js ls
```

## `./bin/run.js remove product PRODUCT`

Remove an especified product stored in database

```
USAGE
  $ ./bin/run.js remove product PRODUCT [-f]

ARGUMENTS
  PRODUCT  the product to remove (is upper insensitive)

FLAGS
  -f, --force

DESCRIPTION
  Remove an especified product stored in database

EXAMPLES
  $ ./bin/run.js remove product chesse

  $ ./bin/run.js remove product carrot --force
```

## `./bin/run.js remove section SECTION`

Remove a group of products in the especified section stored in database

```
USAGE
  $ ./bin/run.js remove section SECTION [-f]

ARGUMENTS
  SECTION  the products section to remove

FLAGS
  -f, --force

DESCRIPTION
  Remove a group of products in the especified section stored in database

EXAMPLES
  $ ./bin/run.js remove section fruits

  $ ./bin/run.js remove section vegetables --force
```
<!-- commandsstop -->

## Table of contents
  <!-- toc -->
* [oclif practice](#oclif-practice)
<!-- tocstop -->

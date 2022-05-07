# How to build
JEQL is written in es6 and uses javascript modules. For someone stuck in the early-mid 2010s, it may be desirable for them to not use JEQL as a module. In order to support them, we can compile this es6 code using babel to es5. In order to do this you first must install node.js and navigate to the jaaql/apps/JEQL directory and run

    npm -i

Which will install a few things (babel and webpack). You can then use the following command to build 2 versions of JEQL. JEQL_package.js and JEQL_package.min.js

    npm run build

# todoApp

## 소스코드 다운로드
```shell
$ git clone https://github.com/selectjun/todoApp.git
```

<br />

## 안내
- 반드시 Frontend, Backend 각각 기동을 시켜주셔야 합니다.


<br />

## 프로젝트 구조
- todoApp
  - todoApp-backend (Java 기반의 API)
  - todoApp-frontend (React.js)
  - todoApp-nodejs (Node.js 기반의 API)

<br />

## Backend Configure (/todoApp/todoApp-nodejs/config/config.json)
```json
{
  "dev": {
    "datasource": {
      "database": "데이터베이스 이름",
      "username": "데이터베이스 계정",
      "password": "데이터베이스 암호",
      "host": "데이터베이스 URL",
      "driver": "데이터베이스 종류",
      "pool": {
        "max": 5,
        "min": 0,
        "acquire": 30000,
        "idle": 10000
      }
    },
    "jwt": {
      "secretKey": "JWT Secret Key",
      "expiration": "JWT 만료시간"
    }
  }
}
```
- Github에는 설정파일이 포함되지 않아 <mark>/todoApp/todoApp-nodejs/config/config.json</mark>을 생성한 후, 위와 같이 데이터베이스 정보 및 JWT(JSON Web Token) 설정 값을 지정해주어야 한다. 지정해주지 않을 시, 실행되지 않는다.

<br />

## Backend 기동
```shell
$ cd todoApp/todoApp-nodejs
$ npm install
$ npm start

> todoapp-nodejs@1.0.0 start /mnt/c/Projects/todoApp/workspace/todoApp/todoApp-nodejs
> nodemon app.js

[nodemon] 2.0.6
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
Example app listening at http://localhost:3000
(node:5407) [SEQUELIZE0006] DeprecationWarning: This database engine version is not supported, please update your database server. More information https://github.com/sequelize/sequelize/blob/master/ENGINE.md
(Use `node --trace-deprecation ...` to show where the warning was created)
Executing (default): SELECT 1+1 AS result
Connection has been established successfully.
```

<br />

## Frontend 기동
```shell
$ cd todoApp/todoApp-frontend
$ npm install
$ npm start

> todoapp-frontend@1.0.0 start /mnt/c/Projects/todoApp/workspace/todoApp/todoApp-frontend
> webpack-dev-server --mode development --hot

ℹ ｢wds｣: Project is running at http://localhost:9000/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wds｣: Content not from webpack is served from /mnt/c/Projects/todoApp/workspace/todoApp/todoApp-frontend/dist
ℹ ｢wds｣: 404s will fallback to /index.html
ℹ ｢wdm｣: Hash: 85870338d6625151e53a
Version: webpack 4.44.2
Time: 3009ms
Built at: 12/20/2020 3:02:59 AM
     Asset       Size  Chunks             Chunk Names
index.html  250 bytes          [emitted]
   main.js   1.87 MiB    main  [emitted]  main
Entrypoint main = main.js
[0] multi (webpack)-dev-server/client?http://localhost:9000 (webpack)/hot/dev-server.js ./src/index.jsx 52 bytes {main} [built]
[./node_modules/react-dom/index.js] 1.33 KiB {main} [built]
[./node_modules/react-redux/es/index.js] 776 bytes {main} [built]
[./node_modules/react/index.js] 190 bytes {main} [built]
[./node_modules/redux-devtools-extension/index.js] 635 bytes {main} [built]
[./node_modules/redux/es/redux.js] 23.6 KiB {main} [built]
[./node_modules/strip-ansi/index.js] 161 bytes {main} [built]
[./node_modules/webpack-dev-server/client/index.js?http://localhost:9000] (webpack)-dev-server/client?http://localhost:9000 4.29 KiB {main} [built]
[./node_modules/webpack-dev-server/client/overlay.js] (webpack)-dev-server/client/overlay.js 3.51 KiB {main} [built]
[./node_modules/webpack-dev-server/client/socket.js] (webpack)-dev-server/client/socket.js 1.53 KiB {main} [built]
[./node_modules/webpack-dev-server/client/utils/createSocketUrl.js] (webpack)-dev-server/client/utils/createSocketUrl.js 2.91 KiB {main} [built]
[./node_modules/webpack-dev-server/client/utils/log.js] (webpack)-dev-server/client/utils/log.js 964 bytes {main} [built]
[./node_modules/webpack-dev-server/client/utils/reloadApp.js] (webpack)-dev-server/client/utils/reloadApp.js 1.59 KiB {main} [built]
[./node_modules/webpack/hot/dev-server.js] (webpack)/hot/dev-server.js 1.59 KiB {main} [built]
[./src/index.jsx] 1.58 KiB {main} [built]
    + 149 hidden modules
Child HtmlWebpackCompiler:
     1 asset
    Entrypoint HtmlWebpackPlugin_0 = __child-HtmlWebpackPlugin_0
    [./node_modules/html-webpack-plugin/lib/loader.js!./public/index.html] 297 bytes {HtmlWebpackPlugin_0} [built]
ℹ ｢wdm｣: Compiled successfully.
```

### 사이트 접속
- [http://localhost:9000/login](http://localhost:9000/login)로 접속
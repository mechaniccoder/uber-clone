## typeorm pgadmin4 연동

ormConfig.ts 파일에서 entities 경로 설정할 때 주의해야 한다. 상대경로로 적지말고 다음 두 가지 방법중 하나를 사용해야한다.

```
__dirname + "/entity/**/*.ts"

src/entity/**/*.ts
```

## Food ordering and Table reservation system for lewi cafe.

## Project setup(to install node modules and dependencies)
```
npm install    
```

### Compiles and hot-reloads for development
```
npm run serve
```
## At the backend use your own chapa api key.

## to test chapa payment use one of those number which provided by chapa
### awash
```
 0900123456
```
### amole
```
 0900123456
```

### telebirr
```
0900123456
```




# See all running containers
docker compose ps

# View backend logs
docker compose logs backend
docker compose logs -f backend

# View frontend logs
docker compose logs frontend


# Restart everything
docker compose restart

# Stop everything
docker compose down -v | docker compose down
docker compose up --build -d

also new init.sql file added
config/database.js changed
docker-compose file added in main root folder

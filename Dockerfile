FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app
EXPOSE 8080

# copy .csproj and restore as distinct layer
COPY "BookingRuangan.sln" "BookingRuangan.sln"
COPY "API/API.csproj" "API/API.csproj"

RUN dotnet restore "BookingRuangan.sln"

# copy everything else build
COPY . .
WORKDIR /app
RUN dotnet publish -c Release -o out

# build a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "API.dll" ]
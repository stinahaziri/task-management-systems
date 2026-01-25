# 1. Image që bën build (përmban SDK-në e .NET)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# 2. Kopjo vetëm file-in e projektit dhe bëj restore
# Kjo ndihmon që build-i të jetë më i shpejtë
COPY backend.csproj ./
RUN dotnet restore

# 3. Kopjo të gjithë pjesën tjetër të kodit (përfshirë Program.cs)
COPY . ./

# 4. KRIJO DLL-në (Këtu Docker-i e shndërron kodin tënd në .dll)
RUN dotnet publish -c Release -o out

# 5. Image që do të ekzekutojë aplikacionin (më i vogël dhe më i shpejtë)
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Kopjo gjithçka që u krijua te folderi 'out' te hapi 4
COPY --from=build /app/out .

# Tregoji portin (Render dhe Railway zakonisht duan portin 80 ose 8080)
EXPOSE 80
ENV ASPNETCORE_URLS=http://+:80

# Kjo është pika e nisjes. Docker do të kërkojë file-in që u krijua nga backend.csproj
ENTRYPOINT ["dotnet", "backend.dll"]
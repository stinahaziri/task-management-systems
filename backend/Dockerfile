# 1. Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

COPY backend.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o out

# 2. Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/out .

# Rregullon problemin e Segmentation Fault (139) dhe Globalization
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=true

# .NET 9 përdor portin 8080 si default
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "backend.dll"]
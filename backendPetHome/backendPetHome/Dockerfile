#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["backendPetHome/backendPetHome.API.csproj", "backendPetHome/"]
COPY ["BAL/backendPetHome.BLL.csproj", "BAL/"]
COPY ["DAL/backendPetHome.DAL.csproj", "DAL/"]
RUN dotnet restore "backendPetHome/backendPetHome.API.csproj"
COPY . .
WORKDIR "/src/backendPetHome"
RUN dotnet build "backendPetHome.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "backendPetHome.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY ["DAL/Data/FunctionsUp/", "Data/FunctionsUp/"]
COPY ["DAL/Data/FunctionsDown/", "Data/FunctionsDown/"]
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "backendPetHome.API.dll"]

RUN apt-get clean && apt-get update && apt-get install -y locales
RUN locale-gen uk_UA.UTF-8
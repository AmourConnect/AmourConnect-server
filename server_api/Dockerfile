FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 5267

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/AmourConnect.API/AmourConnect.API.csproj", "AmourConnect.API/"]
COPY ["src/AmourConnect.App/AmourConnect.App.csproj", "AmourConnect.App/"]
COPY ["src/AmourConnect.Infra/AmourConnect.Infra.csproj", "AmourConnect.Infra/"]
COPY ["src/AmourConnect.Domain/AmourConnect.Domain.csproj", "AmourConnect.Domain/"]
RUN dotnet restore "AmourConnect.API/AmourConnect.API.csproj"
COPY . ../
WORKDIR "/src/AmourConnect.API"
RUN dotnet build "AmourConnect.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
RUN dotnet publish --no-restore -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AmourConnect.API.dll"]
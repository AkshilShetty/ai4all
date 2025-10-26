# ai4all-frontend

React + Vite frontend for ai4all (Azure Static Web Apps + Azure Functions)

## Local dev
1. `npm install`
2. create `.env` with `VITE_FUNCTION_URL`
3. `npm run dev` and open http://localhost:5173

## Deploy to Azure Static Web Apps
- Use `az staticwebapp create` or the Azure Static Web Apps extension in VS Code.
- Configure social auth providers in the Static Web App -> Authentication
- In Azure Portal -> your Function App -> Configuration, set AzureWebJobsStorage to your storage connection string (server-side).
# ai4all

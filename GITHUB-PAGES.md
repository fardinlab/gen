# Publish on GitHub Pages

## Easy Method

1. Create a new GitHub repository.
2. Upload everything inside this folder:

   `admin-license-site`

3. Go to repository `Settings`.
4. Open `Pages`.
5. Under `Build and deployment`, select:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
6. Click `Save`.

GitHub will give you a public URL like:

`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Use the Website

Open the GitHub Pages URL and enter:

- Function URL: `https://nawuvricvqyubjjmdoef.supabase.co/functions/v1/generate-license`
- Admin token: your private token, for example `elitefardinlab`

Do not share the admin token publicly.


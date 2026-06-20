# TechSubxBD License Admin

This small website creates licenses through the Supabase Edge Function:

`https://nawuvricvqyubjjmdoef.supabase.co/functions/v1/generate-license`

## 1. Deploy the Edge Function

Run this from the project folder:

```bash
supabase functions deploy generate-license --project-ref nawuvricvqyubjjmdoef --no-verify-jwt
```

## 2. Set the admin token

Choose your own private admin token/password and set it in Supabase:

```bash
supabase secrets set LICENSE_ADMIN_TOKEN=CHANGE_THIS_ADMIN_TOKEN --project-ref nawuvricvqyubjjmdoef
```

Your existing `SERVICE_ROLE_KEY` secret must also be set. If it already works for `validate-license`, you should be okay.

## 3. Open the Website

Open:

`admin-license-site/index.html`

Enter:

- Function URL: `https://nawuvricvqyubjjmdoef.supabase.co/functions/v1/generate-license`
- Admin token: the token you set in step 2
- Customer name
- Plan

Then click `Create License`.

## Plans

- `10_minutes`
- `1_day`
- `7_days`
- `15_days`
- `30_days`
- `lifetime`


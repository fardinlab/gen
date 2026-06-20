# TechSubxBD License Admin

This small website creates licenses through the Supabase Edge Function:

`https://na*****cvqyubjjmdoef.supabase.co/functions/v1/gene**te-license`

## 1. Deploy the Edge Function

Run this from the project folder:

```bash
supabase functions deploy generate-license --project-ref na*****icvqyubjjmdoef --no-verify-jwt
```

## 2. Set the admin token

Choose your own private admin token/password and set it in Supabase:

```bash
supabase secrets set LICENSE_ADMIN_TOKEN=***GE_THIS_ADMIN_TOKEN --project-ref na****icvqyubjjmdoef
```

Your existing `SERV****E_KEY` secret must also be set. If it already works for `valid***cense`, you should be okay.

## 3. Open the Website

Open:

`admin-license-site/index.html`

Enter:

- Function URL: `https://na*****vqyubjjmdoef.supabase.co/functions/v1/generate-license`
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


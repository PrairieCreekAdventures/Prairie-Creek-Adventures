# Prairie Creek Farms — Deployment Guide

Everything you need to get this site live at your own domain, with an admin panel for writing posts. No command line required.

**Total time:** about 90 minutes the first time. After that, publishing a new post takes 2 minutes.

---

## What you're building

- A fast, beautiful website hosted on Netlify (free)
- Source code stored in GitHub (free)
- An admin panel at `yourdomain.com/admin` where you log in and write posts
- Every time you save a post, the site rebuilds and deploys itself in about 60 seconds

---

## Part 1 — Create your accounts (10 minutes)

### 1.1 — Create a GitHub account

GitHub is where your site's files live. Think of it as the "filing cabinet" Netlify reads from.

1. Go to [github.com](https://github.com)
2. Click **Sign up**
3. Use your work email. Pick a username — this will show up in URLs, so keep it professional (e.g. `prairie-creek-farms` or your own name).
4. Verify your email when they send the link.

### 1.2 — Create a Netlify account

Netlify is the host — the thing that actually serves your website to visitors.

1. Go to [netlify.com](https://netlify.com)
2. Click **Sign up**
3. Choose **Sign up with GitHub** (this is important — it links the two accounts)
4. Authorize Netlify when GitHub asks

You now have both accounts and they're connected. Good.

---

## Part 2 — Put the site files on GitHub (15 minutes)

### 2.1 — Create a new repository

1. In GitHub, click the **+** icon in the top-right, then **New repository**
2. Repository name: `prairie-creek-farms` (or whatever you want — it won't be visible to visitors)
3. Leave it set to **Public** (private repos need paid Netlify)
4. Check the box for **Add a README file**
5. Click **Create repository**

### 2.2 — Upload the project files

You'll see your new empty repo. Now upload the files I built:

1. On the repo page, click **Add file** → **Upload files**
2. From your computer, open the `prairie-astro` folder I gave you
3. **Important:** you need to drag the *contents* of that folder — not the folder itself — into GitHub. So open the folder, select everything inside it (all the files and folders), and drag them all into the GitHub upload area.
4. You'll see a list building up — `package.json`, `astro.config.mjs`, `src/`, `public/`, etc.
5. Scroll down, in the "Commit changes" box write: `Initial upload`
6. Click **Commit changes**

Wait a few seconds. Refresh the page. You should see your files — `src`, `public`, `package.json`, etc.

> **Trouble uploading subfolders?** GitHub's web interface sometimes flattens folder drags. If that happens, upload `package.json`, `astro.config.mjs`, `netlify.toml`, and `.gitignore` first at the root, then click "Add file → Upload files" again and drag the `src` folder, then repeat for `public`. The folder structure needs to be preserved.

---

## Part 3 — Deploy to Netlify (5 minutes)

### 3.1 — Connect the repo

1. In Netlify, click **Add new site** → **Import an existing project**
2. Click **Deploy with GitHub**
3. Authorize it to see your repositories (first time only)
4. Pick the `prairie-creek-farms` repo

### 3.2 — Configure the build

Netlify should auto-detect these, but verify:

- **Branch:** `main`
- **Build command:** `npm run build`
- **Publish directory:** `dist`

If any of these are wrong, fix them. Click **Deploy site**.

### 3.3 — Wait

Netlify will now build your site. This takes 1–3 minutes the first time. You'll see a log scrolling by. When it says **Published**, you're live.

You'll get a random URL like `bright-cactus-123.netlify.app`. Visit it. Your site should be there, exactly as I designed it, with the three sample posts.

### 3.4 — Rename to something memorable

1. Go to **Site configuration** → **Change site name**
2. Change it to `prairie-creek-farms` or similar. This doesn't affect your real domain; it just makes the Netlify URL friendlier.

---

## Part 4 — Connect your domain (10 minutes)

### 4.1 — Add the domain in Netlify

1. In your site's Netlify dashboard, go to **Domain management**
2. Click **Add a domain**
3. Type your domain (e.g. `prairiecreekfarms.com`) and click **Verify**
4. Netlify will ask you to prove you own it. Click **Yes, add domain**.

### 4.2 — Update DNS at your registrar

This is the part that varies based on where you bought the domain (GoDaddy, Namecheap, Google Domains, etc.). The idea is the same everywhere:

1. Log into your domain registrar
2. Find the DNS settings for your domain (usually "DNS", "Nameservers", or "DNS records")
3. You have **two options**:

**Option A — Easiest:** Change your nameservers to Netlify's nameservers. Netlify will give you four addresses like `dns1.p03.nsone.net`. Replace your current nameservers with these. Netlify then manages everything.

**Option B — More control:** Keep your current nameservers and add records manually:
- An **A record** for `@` (the bare domain) pointing to `75.2.60.5`
- A **CNAME record** for `www` pointing to `yoursite.netlify.app`

### 4.3 — Wait for propagation

DNS changes can take anywhere from 10 minutes to 24 hours (usually under an hour). Netlify will show "Netlify DNS" or "DNS verification" status until it's ready.

### 4.4 — Turn on HTTPS

Once the domain is verified, Netlify will automatically give you a free SSL certificate via Let's Encrypt. It may take a few minutes to provision. You don't have to do anything — just check back and click **Verify DNS configuration** if it's stuck.

---

## Part 5 — Set up the admin panel (20 minutes)

This is the part that lets you log in and write posts through a web dashboard.

### 5.1 — Enable Netlify Identity

1. In your Netlify site dashboard, go to **Integrations** → search for **Identity**
   - *(In older Netlify UIs this lives at: Site configuration → Identity)*
2. Click **Enable Identity**

### 5.2 — Configure registration

1. Under **Identity** → **Registration preferences**, set it to **Invite only** (so random people can't sign up)
2. Under **External providers**, you can optionally add "Google" or "GitHub" for easier login — not required

### 5.3 — Enable Git Gateway

This is what lets the admin panel actually save posts to GitHub.

1. Scroll down to **Services** → **Git Gateway**
2. Click **Enable Git Gateway**

### 5.4 — Invite yourself as a user

1. Under **Identity** → **Users** tab
2. Click **Invite users**
3. Enter your email
4. Check your email for the invite. Click the link.
5. You'll be taken to your site with a URL that looks like `yourdomain.com/#invite_token=...`
6. **Important:** Change `yourdomain.com/` to `yourdomain.com/admin/` (add `/admin/` before the `#`). So the URL becomes `yourdomain.com/admin/#invite_token=...`
7. The page will ask you to set a password. Do that.

### 5.5 — Log in

1. Go to `yourdomain.com/admin`
2. Click **Login with Netlify Identity**
3. Enter your email + password
4. You should see the admin dashboard with three sections: **Journal Posts**, **Recipes**, **Seasons / Issues**

You can now create, edit, and publish content from this dashboard. Changes take about 60 seconds to appear on the live site.

---

## Part 6 — Everyday usage

### Writing a new post

1. Go to `yourdomain.com/admin`
2. Log in
3. Click **Journal Posts** → **New Post**
4. Fill in title, author, date, category, excerpt, hero image
5. Write the body in the markdown editor (looks like a regular word processor)
6. Click **Publish** → **Publish now** (or save as draft)
7. Wait 60 seconds, refresh your site. Post is live.

### Writing a new recipe

Same process but click **Recipes** instead. Fill in cook time, season, servings. In the body, use markdown headings like `## Ingredients` and `## Method`.

### The editorial workflow

I enabled "Editorial Workflow" mode, which means:
- **Draft** — only visible in the admin
- **In Review** — ready for someone to check
- **Ready** — approved and ready to publish
- **Publish Now** — live on the site

If you're a solo editor you can ignore the review step and just use "Publish Now."

### Adding images

Inside any post, click the image icon in the editor. Upload an image. It gets stored in your GitHub repo under `public/images/uploads/` and linked automatically.

**Image tips:**
- Aim for 1600x900px for hero images
- JPG for photos, PNG if there's transparency
- Keep files under 500KB — use [tinypng.com](https://tinypng.com) to compress

---

## Troubleshooting

**The site built but pages are broken / 404**
Check that the folder structure inside GitHub matches what I gave you. You should see `src/pages/index.astro`, `src/content/posts/*.md`, etc. If `src` is missing or empty, re-upload it.

**Admin panel shows "Config error"**
Open `public/admin/config.yml` in GitHub and check it hasn't been corrupted. The YAML is whitespace-sensitive.

**My new post doesn't show up**
- Did you click **Publish Now** (not just Save)?
- Check the deploy log in Netlify. If the build failed, the log will say why.
- Look at the post's "draft" toggle — if it's on, it's hidden.

**The site looks unstyled**
This usually means the CSS file isn't loading. Check `src/styles/global.css` exists in your repo.

**Build fails with "command not found"**
Netlify might be using the wrong Node version. In Netlify: **Site configuration** → **Environment variables** → add `NODE_VERSION` with value `20`.

**I messed something up and want to go back**
GitHub keeps every version. In your repo, click **Commits**, find a working version, and you can revert to it. Or just ask me for help.

---

## What to do next

**Right away:**
- Replace my placeholder hero images with real photos of Prairie Creek Farms
- Update the "About the farm" copy to match the real farm story
- Change the social media links in the footer

**Eventually:**
- Add a working newsletter (connect the form to Mailchimp, Buttondown, or ConvertKit)
- Add Google Analytics or Plausible for traffic stats
- Consider adding a search feature (Algolia has a free tier)

**If you get stuck:**
Netlify and Decap both have good communities. For Netlify, the [Answers forum](https://answers.netlify.com) is excellent. For Decap CMS, [decapcms.org/docs](https://decapcms.org/docs/).

---

## File structure reference

```
prairie-astro/
├── astro.config.mjs              ← Astro settings
├── netlify.toml                  ← Tells Netlify how to build
├── package.json                  ← Lists dependencies
├── .gitignore                    ← Files Git should ignore
│
├── src/
│   ├── content.config.ts         ← Defines content types
│   ├── layouts/
│   │   └── BaseLayout.astro      ← Shared header/footer
│   ├── pages/
│   │   ├── index.astro           ← Homepage
│   │   ├── journal/
│   │   │   ├── index.astro       ← Journal archive
│   │   │   └── [...slug].astro   ← Individual post page
│   │   ├── recipes/
│   │   │   ├── index.astro       ← Recipe archive
│   │   │   └── [...slug].astro   ← Individual recipe page
│   │   └── seasons/
│   │       ├── index.astro       ← Seasons grid
│   │       └── [...slug].astro   ← Individual season page
│   ├── styles/
│   │   └── global.css            ← All the design
│   └── content/                  ← Your actual content
│       ├── posts/*.md            ← Blog posts
│       ├── recipes/*.md          ← Recipes
│       └── seasons/*.md          ← Seasons
│
└── public/
    ├── admin/
    │   ├── index.html            ← Admin panel entry
    │   └── config.yml            ← Admin panel fields
    ├── favicon.svg
    ├── script.js
    └── images/uploads/           ← Where uploaded images go
```

---

*Made slowly, for Prairie Creek Farms.*

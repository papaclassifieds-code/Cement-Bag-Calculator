# Cement Bag Calculator (सीमेंट कैलकुलेटर)

A fast, mobile-friendly Indian construction material calculator for estimating cement bags, sand (CFT / Brass / Trolley), aggregate/gitti, bricks, and total costs across Slab (छत), Brickwork (दीवार), Plaster (प्लास्टर), Columns (पिलर), and Flooring (फर्श).

---

## 🚀 How to Publish to GitHub & Vercel (Step-by-Step)

### Step 1: Push Code to GitHub

1. **Initialize Git (if not already done) and commit your files**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Cement Bag Calculator"
   ```

2. **Create a new repository on GitHub**:
   - Go to [GitHub.com/new](https://github.com/new)
   - Name your repository (e.g. `cement-bag-calculator`)
   - Keep it Public or Private and click **Create repository**

3. **Link and push to GitHub**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/cement-bag-calculator.git
   git push -u origin main
   ```

---

### Step 2: Deploy on Vercel

1. **Sign in to Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in with your GitHub account.

2. **Import your repository**:
   - Click **"Add New..."** -> **"Project"**.
   - Find your `cement-bag-calculator` repository and click **Import**.

3. **Deploy settings (Pre-configured via `vercel.json`)**:
   - **Framework Preset**: `Vite` (automatically detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` or `vite build`
   - **Output Directory**: `dist`
   - Click **Deploy**!

In less than 60 seconds, your site will be live with a free `*.vercel.app` URL and automatic HTTPS! Every time you `git push`, Vercel will automatically redeploy the latest version.

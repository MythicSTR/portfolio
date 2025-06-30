
#!/bin/bash

# Build the project
npm run build

# Navigate to the build directory
cd dist

# Create a .nojekyll file to bypass Jekyll processing
touch .nojekyll

# Initialize git in the build directory
git init
git checkout -b main
git add .
git commit -m "Deploy to GitHub Pages"

# Force push to the gh-pages branch of your repository
git push -f https://github.com/MythicSTR/portfolio.git main:gh-pages

# Return to the project root directory
cd ..

echo "Deployment complete!"

# Run build
npm run build
# First copy all files except build/ to "root/", then copy all files from build/ to the root directory.
Copy-Item -Path ".\*" -Destination ".\root" -Recurse -Force -Exclude "build"
Copy-Item -Path ".\build\*" -Destination "." -Recurse -Force

# Push changes to the GitHub repository.
git add .
git commit -m "Update GitHub Pages"
git push

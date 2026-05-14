@echo off
echo Syncing Auth Flow...
git add "app/(auth)"
git commit -m "refined login and onboarding flow"

echo Syncing Dashboard...
git add "app/(tabs)"
git commit -m "added minimal dashboard and floating navbar"

echo Syncing Backend Setup...
git add "src/lib/supabase.ts"
git commit -m "configured supabase client integration"

echo Syncing App Layouts...
git add "app/_layout.tsx"
git commit -m "updated root routing logic"

echo Syncing any remaining files...
git add .
git commit -m "general configuration updates"

echo Pushing to GitHub...
git branch -M main
git remote add origin https://github.com/immeeeet/AILIFECOACH.git
git push -u origin main

echo Sync Complete!
pause

# template
template for exams

//new 
git init                    # Initialize a new Git repository
git add .                   # Stage all files
git commit -m "Initial commit"  # Commit changes
git remote add origin https://github.com/your-username/your-repo.git  # Add remote repo
git push -u origin master 

//merge 
git checkout main                   # Switch to the main branch
git merge master --allow-unrelated-histories  # Merge master into main
# Resolve conflicts if any...
git push origin main                # Push changes to the remote repo
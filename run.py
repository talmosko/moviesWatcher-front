import os
import subprocess

def create_work_branch():
    # Create a new branch
    subprocess.run(['git', 'branch', 'work'])
    
    # Switch to the new branch
    subprocess.run(['git', 'checkout', 'work'])
    
    # Get a list of all files in the directory
    files = os.listdir("src")
    
    for file_name in files:
        # Add a whitespace to each file
        with open(file_name, 'a') as file:
            file.write(' ')
    
    # Add all the modified files to the branch
    subprocess.run(['git', 'add', '.'])
    
    # Commit the changes
    subprocess.run(['git', 'commit', '-m', 'Add whitespace to files'])
    
    # Push the changes to the remote repository
    subprocess.run(['git', 'push', '-u', 'origin', 'work'])

# Call the function to execute the workflow
create_work_branch()
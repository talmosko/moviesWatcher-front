import os
import subprocess

def add_whitespace_to_files(directory):
    for root, dirs, files in os.walk(directory):
        for file_name in files:
            file_path = os.path.join(root, file_name)
            # Add a whitespace to each file
            with open(file_path, 'a') as file:
                file.write(' ')

def create_dev_branch():
    # Create a new branch
    subprocess.run(['git', 'branch', 'dev'])
    
    # Switch to the new branch
    subprocess.run(['git', 'checkout', 'dev'])
    
    # Add whitespace to each file inside the 'src' directory and its subfolders
    add_whitespace_to_files('src')
    
    
    # Commit the changes
    subprocess.run(['git', 'commit', '-m', 'Add whitespace to files'])
    
    # Push the changes to the remote repository
    subprocess.run(['git', 'push', '-u', 'origin', 'dev'])

# Call the function to execute the devflow
create_dev_branch()
import os

f = open('grant_execute.sql', 'w')
f.write("USE [333-2014-Driftr]\n\n")

for file in os.listdir("./"):
    if file.endswith(".sql"):
        if "insert" in file or "select" in file or "update" in file or "delete" or "vehicles" in file or "split" in file:
            s = "GRANT EXECUTE ON [" + file[:-4] + "] TO [333Winter2014Driftr]\n"
            f.write(s)

f.close()
            

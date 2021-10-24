How to compress a whole directory in Linux or Unix
You need to use the tar command as follows (syntax of tar command):
tar -zcvf archive-name.tar.gz directory-name

Where,

-z : Compress archive using gzip program in Linux or Unix
-c : Create archive on Linux
-v : Verbose i.e display progress while creating archive
-f : Archive File name
For example, say you have a directory called /home/jerry/prog and you would like to compress this directory then you can type tar command as follows:
$ tar -zcvf prog-1-jan-2005.tar.gz /home/jerry/prog

Above command will create an archive file called prog-1-jan-2005.tar.gz in current directory. If you wish to restore your archive then you need to use the following command (it will extract all files in current directory):
$ tar -zxvf prog-1-jan-2005.tar.gz

Where,

-x: Extract files from given archive
If you wish to extract files in particular directory, for example in /tmp then you need to use the following command:
$ tar -zxvf prog-1-jan-2005.tar.gz -C /tmp
$ cd /tmp
$ ls -

Compress an entire directory to a single file
To compress directory named /home/vivek/bin/ in to a /tmp/bin-backup.tar.gz type the tar command on Linux:
tar -zcvf /tmp/bin-backup.tar.gz /home/vivek/bin/

You can compress multiple directories too:
tar -zcvf my-compressed.tar.gz /path/to/dir1/ /path/to/dir2/
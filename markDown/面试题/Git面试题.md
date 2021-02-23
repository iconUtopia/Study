# 1. Git面试题
## 1.1. 什么是Git复刻（fork）？复刻、分支和克隆之间有什么区别？
* **复刻（fork）**：是对存储仓库（repository）进行的远程的、服务器端的拷贝，从源头上就有所区别。复刻实际上不是Git的范畴。它更想是个政治/社会概念。
* **克隆（clone）**：不是复刻，克隆是对某个远程仓库的本地拷贝。克隆时，实际上是拷贝整个源存储仓库，包括所有历史记录和分支。
* **分支（branch）**：是一种机制，用于处理单一存储仓库中的变更，并最终目的是用于与其他部分代码合并。
# 2. 常用Git命令
## 2.1. 新建代码库
在当前目录新建一个Git代码库：
`$ git init`
新建一个目录，将其初始化为Git代码库：
`$ git init [project-name]`
下载一个项目和他的整个代码历史：
`$ git clone [url]`
## 2.2. 配置
显示当前的Git配置：
`$ git config -list`
编辑Git配置文件：
`$ git config -e [-global]`
设置提交代码时的用户信息：
`$ git config [-global] user.name`;
`$ git config [-global] user.email`
## 2.3. 增/删文件
添加指定文件到暂存区：
`$ git add [file] [file2]……`
添加指定目录到暂存区，包括子目录：
`$git add [dir]`
添加每个变化前，都会要求确认
对于同一个文件的多处变化，可以实现分次提交：
`$ git add -p`
删除工作区文件，并且将这次删除放入暂存区：
`$git rm [file1] [file2]……`
停止追踪指定文件，但该文件会保留在工作区：
`$git rm -cached[file]`
改名文件，并且将这个改名放入暂存区：
`$ git mv [file-original] [file-renamed]`
## 2.4. 提交代码
提交暂存区到仓库区：
`$ git commit -m[message]`
提交暂存区的指定文件到仓库区：
`$ git commit [file1] [file2]…… -m[message]`
提交工作区自上次commit之后的变化，直接到仓库区：
`$ git commit -a`
提交时显示所有的diff信息：
`$ git commit -v`
使用一次新的commit，替代上一次提交
如果代码没有任何变化，则用来改写上一次commit的提交信息：
`$ git commit -amend -m [message]`
重做上一次commit，并包括指定文件的新变化：
`$ git commit -amend [file1] [file2]……`
## 2.5. 分支
列出所有本地分支：
`$ git branch`
列出所有远程分支：
`$ git branch -r`
列出所有本地分支和远程分支：
`$ git branch -a`
 新建一个分支，但依然停留在当前分支：
 `$ git branch [branch-name]`
 新建一个分支，并切换到该分支：
 `$ git checkout -b [branch]`
 新建一个分支，指向指定commit：
 `$ git branch[branch] [commit]`
 新建一个分支，与指定的远程分支简历追踪关系
 `$ git branch -track [branch] [remote-branch]`
 切换到指定分支，并更新工作区：
 `$ git checkout [branch-name]`
 切换到上一个分支
 `$ git checkout -`
 建立追踪关系，在现有分支与指定的远程分支之间：
 `$ git branch -set -upstream [branch] [remote-branch]`
 合并指定分支到当前分支：
 `$ git merge [branch]`
 选择一个commit，合并进当前分支：
 `$ git cherry-pick [commit]`
 删除分支：
 `$ git branch -d [branch-name]`
 删除远程分支：
 `$ git push origin -delete [branch-name]`
 `$ git branch -dr [remote/branch]`
## 2.6. 标签
列出所有tag：
`$ git tag`
新建一个tag在当前commit：
`$ git tag [tag]`
新建一个tag在指定commit：
`$ git tag [tag] [commit]`
删除本地tag：
`$ git tag -d [tag]`
删除远程tag：
`$ git push origin :refs/tags/[tagName]`
查看tag信息：
`$ git show [tag]`
提交指定tag：
`$ git push [remote] [tag]`
提交所有tag：
`$ git push [remote] -tags`
新建一个分支，指向某个tag
`$ git checkout -b [branch] [tag]`

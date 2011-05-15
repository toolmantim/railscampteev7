task :default => :web

watch = false

desc "Compile CSS"
task :compile do
  exec "stylus #{'--watch' if watch} -o public/css styles/home.styl"
end

desc "Watch & compile CSS"
task :watch do
  watch = true
  Rake::Task[:compile].invoke
end

desc "Boot it up"
task :web do
  ENV["SECRET_PASSWORD"] = "sekrit"
  exec "thin start"
end

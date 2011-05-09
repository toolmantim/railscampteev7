task :default => :compile

watch = false

desc "Compile CSS"
task :compile do
  exec "stylus #{'--watch' if watch} -o public/css styles/railscampteev7.styl"
end

desc "Watch & compile CSS"
task :watch do
  watch = true
  Rake::Task[:compile].invoke
end

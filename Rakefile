task :default => :web

desc "Boot it up"
task :web do
  ENV["SECRET_PASSWORD"] = "sekrit"
  exec "thin start"
end

desc "Compile CSS"
task :styles do
  exec "stylus --compress --watch -o public styles/home.styl"
end

desc "Livereload the CSS files"
task :livereload do
  exec "guard"
end

require "sinatra"
require "haml"
require "json"

set :haml, :format => :html5

helpers do
  def partial(name)
    haml :"_#{name}", :layout => false
  end
  def readme_sans_install
    File.read(File.join(settings.root, "Readme")).split("## Install instructions")[0]
  end
  def verify_password!
    halt([401, "WHO YOU HACKIN FOOL?!"]) if
      !(p = params.delete("password")) || p.downcase != ENV["SECRET_PASSWORD"].downcase
  end
  def json(obj)
    content_type 'application/json'
    obj.to_json
  end
end

get "/" do
  haml :app
end

post "/authorise" do
  verify_password!
  "You're in!"
end

post "/order" do
  verify_password!
  json :number => 42
end

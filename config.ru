require "sinatra"
require "haml"
require "json"

set :haml, :format => :html5

helpers do
  def partial(name)
    haml :"_#{name}", :layout => false
  end
  def verify_password!
    halt([401, "WHO YOU HACKIN FOOL?!"]) if params[:password] != ENV["SECRET_PASSWORD"]
  end
  def json(obj)
    content_type 'application/json'
    obj.to_json
  end
end

get "/" do
  haml :home
end

post "/authorise" do
  verify_password!
  "You're in!"
end

post "/order" do
  verify_password!
  json :number => rand(160)+1
end

run Sinatra::Application

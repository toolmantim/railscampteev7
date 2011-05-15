require "sinatra"
require "haml"

set :haml, :format => :html5

helpers do
  def partial(name)
    haml :"_#{name}", :layout => false
  end
  def verify_password!
    halt([401, "WHO YOU HACKIN FOOL?!"]) if params[:password] != ENV["SECRET_PASSWORD"]
  end
end

get "/" do
  haml :home
end

post "/authorise" do
  verify_password!
  [200, "You're in!"]
end

post "/order" do
  verify_password!
  [200, "Order complete."]
end

run Sinatra::Application

require "sinatra"
require "haml"

set :haml, :format => :html5

helpers do
  def partial(name)
    haml :"_#{name}", :layout => false
  end
end

get "/" do
  haml :home
end

post "/authorise" do
  params[:password] == ENV["SECRET_PASSWORD"] ?
    [200,"You're in!"] :
    [401,"WHO YOU HACKIN FOOL?!"]
end

run Sinatra::Application

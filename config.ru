require "sinatra"
require "haml"

set(:haml, :format => :html5)
set(:views) { root }

get "/" do
  haml :home
end

post "/authorise" do
  params[:password] == ENV["SECRET_PASSWORD"] ?
    [200,"Ok"] :
    [401,"ACCESS DENIED, FOOL!"]
end

run Sinatra::Application

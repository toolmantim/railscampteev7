require 'sinatra'
require 'haml'

set :haml, :format => :html5
set(:views) { root }

get '/' do
  haml :home
end

run Sinatra::Application

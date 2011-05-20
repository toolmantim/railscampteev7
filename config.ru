require "rack-pagespeed"
require "./app"

require "dalli"
module Rack::PageSpeed::Store; end
class Rack::PageSpeed::Store::Dalli
  def initialize opts
    @client = Dalli::Client.new(opts[:servers], :username => opts[:username], :password => opts[:password])
  end
  def [] key
    @client.get key
  end
  def []= key, value
    @client.set key, value
    true
  end
end

use Rack::PageSpeed, :public => Sinatra::Application.public do
  if production?
    store :dalli, :servers => ENV["MEMCACHE_SERVERS"],
                  :username => ENV["MEMCACHE_USERNAME"],
                  :password => ENV["MEMCACHE_PASSWORD"]
  else
    store :disk => Dir.tmpdir
  end
  combine_javascripts
end

run Sinatra::Application

require "sinatra"
require "haml"
require "json"
require "sinatra/activerecord"
require "sinatra/cache_assets"

set :haml, :format => :html5

use Sinatra::CacheAssets, :max_age => 86400*100 # 100 days

set :asset_cache_token, ENV["COMMIT_HASH"] || Time.now.to_i.to_s

class Order < ActiveRecord::Base
  validates_presence_of :name, :email, :cut, :size
  validates_inclusion_of :cut, :in => %w( m f )
  validates_inclusion_of :size, :in => %w( xs s m l xl 2xl )
end

helpers do
  def partial(name)
    haml :"_#{name}", :layout => false
  end
  def verify_password!
    halt([401, "WHO YOU HACKIN FOOL?!"]) if
      !(p = params.delete("password")) || p.downcase != ENV["SECRET_PASSWORD"].downcase
  end
  def json(obj)
    content_type 'application/json'
    obj.to_json
  end
  def asset_path(asset)
    asset + "?" + settings.asset_cache_token
  end
  def javascripts
    %w(
      /vendor/jquery.js
      /vendor/underscore.js
      /vendor/backbone.js
      /js/rubpocalypse.js
      /js/sounds.js
      /js/views/form.js
      /js/views/gate.js
      /js/views/confirmation.js
      /js/views/order.js
      /js/home.js
    ).map {|p| asset_path(p) }
  end
  def readme_sans_install
    File.read(File.join(settings.root, "Readme")).split("## Install instructions")[0]
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
  json :number => Order.create!(params).id
end
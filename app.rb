require "sinatra"
require "haml"
require "json"
require "sinatra/activerecord"

set :haml, :format => :html5

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
    halt([401, "WHO YOU HACKIN FOOL?!"]) if params.delete("password") != ENV["SECRET_PASSWORD"]
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
  json :number => Order.create!(params).id
end
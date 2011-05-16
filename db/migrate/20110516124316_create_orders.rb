class CreateOrders < ActiveRecord::Migration
  def self.up
    create_table :orders do |t|
      t.timestamps
      t.text :name
      t.text :email
      t.text :cut
      t.text :size
    end
  end

  def self.down
    drop_table :orders
  end
end

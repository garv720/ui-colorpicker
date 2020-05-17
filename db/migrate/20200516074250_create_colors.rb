class CreateColors < ActiveRecord::Migration[6.0]
  def change
    create_table :colors do |t|
      t.string :name, null: :false
      t.string :hex_code, null: :false

      t.timestamps
    end
  end
end

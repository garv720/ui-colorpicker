class Color < ApplicationRecord
	validates :name, presence: true
	validates :hex_code, presence: true
end

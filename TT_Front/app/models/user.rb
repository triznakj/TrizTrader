class User < ActiveRecord::Base
	require 'net/http'

	def self.All
		uri = URI('http://localhost:3000/user') 
		users = Net::HTTP.get(uri)
		p users
		parse = JSON.parse users
		p parse
		return parse
	end

	def self.Post newUser
		uri = URI('http://localhost:3000/user')
		http = Net::HTTP.new(uri.host, uri.port)
		http.post(uri, newUser.to_json, {"Content-Type" => "application/json", "Accept" => "application/json"})
	end
end

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

	def self.delete id
		uri = URI('http://localhost:3000/user/'+id)
		http = Net::HTTP.new(uri.host, uri.port)
		req = Net::HTTP::Delete.new(uri.path)
		res = http.request(req)
		puts "deleted #{res}"
	end
end

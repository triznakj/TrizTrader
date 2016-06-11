class Position < ActiveRecord::Base
	require 'net/http'

	def self.All
		uri = URI('http://localhost:3000/position') 
		positions = Net::HTTP.get(uri)
		parse = JSON.parse positions
		return parse
	end

	def self.Post newPos
		uri = URI('http://localhost:3000/position')
		http = Net::HTTP.new(uri.host, uri.port)
		http.post(uri, newPos.to_json, {"Content-Type" => "application/json", "Accept" => "application/json"})
	end

	def self.Delete id
		uri = URI('http://localhost:3000/position/'+id)
		http = Net::HTTP.new(uri.host, uri.port)
		req = Net::HTTP::Delete.new(uri.path)
		res = http.request(req)
	end

	def self.find id
		uri = URI('http://localhost:3000/position/'+id)
		http = Net::HTTP.new(uri.host, uri.port)
		req = Net::HTTP::Get.new(uri.path)
		res = http.request(req)
		return JSON.parse(res.body)
	end

	def self.Put newPos
		puts newPos["_id"]
		uri = URI('http://localhost:3000/position/'+newPos["_id"])
		http = Net::HTTP.new(uri.host, uri.port)
		req = Net::HTTP::Put.new(uri.path, initheader= {'Content-Type' => 'application/json'})
		res = http.request(req, JSON.generate(newPos))
		puts res.body
	end
end

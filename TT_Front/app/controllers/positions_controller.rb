class PositionsController < ApplicationController
	require 'net/http'

	def index
		@positions = Position.All()
	end

	def new

	end

	def show

	end

	def update
		pos = Position.Find(params[:id])
		if not params[:new_price].nil?
			pos["value"] = pos["qty"].to_f * params[:new_price]["share_price"].to_f
			Position.Put(pos)
		end
		if not params[:sell_shares].nil?
			qty_sold = params[:sell_shares]["qty_sold"].to_f
			share_value = (qty_sold/pos["qty"].to_f) * pos["value"]
			trans = {:userId => pos["userId"], 
					:posId => pos["_id"], 
					:ticker => pos["name"], 
					:isBuy => false, 
					:value => share_value,
					:qty => qty_sold}.to_json
			Transaction.Post(trans)
			pos["qty"] = pos["qty"].to_f - qty_sold
			pos["value"] = pos["value"].to_f - share_value
			user = User.find(pos["userId"])
			user["cash_held"] = user["cash_held"].to_f + share_value
			User.Put(user)
			Position.Put(pos)
		end

	end

	def create
		if not params[:position]["pps"].nil?
			params[:position]["qty"] = params[:position][:value].to_f / params[:position]["pps"].to_f
		end
		res = Position.Post(params[:position])
		trans = {:userId => params[:position]["userId"], 
					:posId => res["id"], 
					:ticker => params[:position]["name"], 
					:isBuy => true, 
					:value => params[:position]["value"],
					:qty => params[:position]["qty"]}.to_json
		Transaction.Post(trans)
	end

	def edit

	end

	def destroy
		Position.Delete(params[:id])
	end
end

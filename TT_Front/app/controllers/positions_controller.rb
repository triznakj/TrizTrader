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
		pos = Position.find(params[:id])
		pos["value"] = pos["qty"].to_f * params[:new_price]["share_price"].to_f
		Position.Put(pos)
	end

	def create
		if not params[:position]["pps"].nil?
			params[:position]["qty"] = params[:position][:value].to_f / params[:position]["pps"].to_f
		end
		Position.Post(params[:position])
	end

	def edit

	end

	def destroy
		Position.Delete(params[:id])
	end
end

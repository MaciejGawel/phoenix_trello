defmodule PhoenixTrello.UserSocket do
  use Phoenix.Socket

  alias PhoenixTrello.{Repo, User}

  ## Channels
  channel "users:*", PhoenixTrello.UserChannel
  channel "boards:*", PhoenixTrello.BoardChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket
  transport :longpoll, Phoenix.Transports.LongPoll

  # Socket params are passed from the client and can
  # be used to verify and authenticate a user. After
  # verification, you can put default assigns into
  # the socket that will be set for all channels, ie
  #
  #     {:ok, assign(socket, :user_id, verified_user_id)}
  #
  # To deny connection, return `:error`.
  #
  # See `Phoenix.Token` documentation for examples in
  # performing token verification on connect.
  def connect(%{"token" => token}, socket) do
    case Guardian.decode_and_verify(token) do
      {:ok, claims} ->
        case GuardianSerializer.from_token(claims["sub"]) do
          {:ok, user} ->
            {:ok, assign(socket, :current_user, user)}
          {:error, _reason} ->
            :error
        end
      {:error, _reason} ->
        :error
    end
    {:ok, socket}
  end

  def connect(_params, _socket), do: :error

  def id(socket), do: "users_socket:#{socket.assigns.current_user.id}"
end

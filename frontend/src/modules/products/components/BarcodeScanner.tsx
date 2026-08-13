import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import {
  BarcodeFormat,
  DecodeHintType,
} from "@zxing/library";

interface Props {
  onDetected: (code: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({
  onDetected,
  onClose,
}: Props) {
  const videoRef =
    useRef<HTMLVideoElement | null>(null);

  const controlsRef =
    useRef<{ stop: () => void } | null>(null);

  const streamRef =
    useRef<MediaStream | null>(null);

  const stoppedRef =
    useRef(false);

  const detectedRef =
    useRef(false);

  useEffect(() => {
    console.log("📷 INICIANDO SCANNER");

    stoppedRef.current = false;
    detectedRef.current = false;

    const hints = new Map();

    hints.set(
      DecodeHintType.POSSIBLE_FORMATS,
      [BarcodeFormat.EAN_13],
    );

    const reader =
      new BrowserMultiFormatReader(hints);

    let mounted = true;

    const stopEverything = () => {
      if (stoppedRef.current) {
        console.log(
          "🛑 SCANNER YA DETENIDO",
        );
        return;
      }

      console.log(
        "🛑 DETENIENDO TODO EL SCANNER",
      );

      stoppedRef.current = true;

      // --------------------------------
      // 1. DETENER ZXING
      // --------------------------------

      if (controlsRef.current) {
        console.log(
          "🛑 STOP ZXING CONTROLS",
        );

        try {
          controlsRef.current.stop();
        } catch (error) {
          console.warn(
            "⚠️ Error deteniendo ZXING:",
            error,
          );
        }

        controlsRef.current = null;
      }

      // --------------------------------
      // 2. DETENER STREAM
      // --------------------------------

      const stream =
        streamRef.current;

      if (stream) {
        console.log(
          "🛑 DETENIENDO STREAM PROPIO",
        );

        stream.getTracks().forEach(
          (track) => {
            console.log(
              "🛑 TRACK:",
              track.kind,
              track.readyState,
            );

            try {
              track.stop();
            } catch {
              // ignorar
            }
          },
        );

        streamRef.current = null;
      }

      // --------------------------------
      // 3. DETENER STREAM DEL VIDEO
      // --------------------------------

      const video =
        videoRef.current;

      if (video) {
        const videoStream =
          video.srcObject;

        if (
          videoStream instanceof MediaStream
        ) {
          console.log(
            "🛑 DETENIENDO STREAM DEL VIDEO",
          );

          videoStream
            .getTracks()
            .forEach((track) => {
              console.log(
                "🛑 VIDEO TRACK:",
                track.kind,
                track.readyState,
              );

              try {
                track.stop();
              } catch {
                // ignorar
              }
            });
        }

        try {
          video.pause();
        } catch {
          // ignorar
        }

        video.srcObject = null;
      }

      console.log(
        "📷 CAMARA DETENIDA - CERRANDO SCANNER",
      );
    };

    const startScanner =
      async () => {
        const video =
          videoRef.current;

        if (!video) {
          console.log(
            "❌ VIDEO NO DISPONIBLE",
          );
          return;
        }

        try {
          console.log(
            "📷 SOLICITANDO STREAM DIRECTAMENTE",
          );

          // --------------------------------
          // OBTENEMOS NOSOTROS EL STREAM
          // --------------------------------

          const stream =
            await navigator.mediaDevices.getUserMedia(
              {
                video: {
                  facingMode: {
                    ideal: "environment",
                  },
                  width: {
                    ideal: 1280,
                  },
                  height: {
                    ideal: 720,
                  },
                },
                audio: false,
              },
            );

          console.log(
            "📷 STREAM OBTENIDO",
          );

          // --------------------------------
          // SI CANCELÓ MIENTRAS ESPERÁBAMOS
          // --------------------------------

          if (
            stoppedRef.current ||
            !mounted
          ) {
            console.log(
              "🧹 STREAM OBTENIDO PERO SCANNER YA CERRADO",
            );

            stream
              .getTracks()
              .forEach((track) =>
                track.stop(),
              );

            return;
          }

          streamRef.current =
            stream;

          // --------------------------------
          // ASIGNAMOS STREAM AL VIDEO
          // --------------------------------

          video.srcObject = stream;

          await video.play();

          console.log(
            "📷 VIDEO REPRODUCIENDO",
          );

          // --------------------------------
          // ZXING USA NUESTRO STREAM
          // --------------------------------

          console.log(
            "📷 INICIANDO ZXING",
          );

          const controls =
            await reader.decodeFromVideoElement(
              video,
              (result) => {
                if (
                  stoppedRef.current ||
                  detectedRef.current
                ) {
                  return;
                }

                if (!result) {
                  return;
                }

                const code =
                  result.getText().trim();

                if (!code) {
                  return;
                }

                console.log(
                  "🎯 EAN-13 DETECTADO:",
                  code,
                );

                detectedRef.current =
                  true;

                stopEverything();

                onDetected(code);
              },
            );

          // --------------------------------
          // ZXING TERMINÓ DE INICIAR
          // --------------------------------

          if (
            stoppedRef.current ||
            !mounted
          ) {
            console.log(
              "🧹 ZXING TERMINÓ PERO YA ESTABA CERRADO",
            );

            try {
              controls.stop();
            } catch {
              // ignorar
            }

            return;
          }

          controlsRef.current =
            controls;

          console.log(
            "📷 ZXING LISTO",
          );
        } catch (error) {
          if (
            stoppedRef.current
          ) {
            return;
          }

          console.error(
            "❌ ERROR INICIANDO CAMARA:",
            error,
          );

          stopEverything();
        }
      };

    startScanner();

    return () => {
      console.log(
        "🧹 CLEANUP CAMARA",
      );

      mounted = false;

      stopEverything();
    };
  }, [onDetected]);

  const handleCancel =
    () => {
      console.log(
        "❌ CANCELAR CAMARA",
      );

      if (
        stoppedRef.current
      ) {
        return;
      }

      stopEverythingManually();

      onClose();
    };

  const stopEverythingManually =
    () => {
      stoppedRef.current = true;

      // -----------------------------
      // ZXING
      // -----------------------------

      if (controlsRef.current) {
        console.log(
          "🛑 CANCEL STOP ZXING",
        );

        try {
          controlsRef.current.stop();
        } catch {
          // ignorar
        }

        controlsRef.current =
          null;
      }

      // -----------------------------
      // STREAM GUARDADO
      // -----------------------------

      if (streamRef.current) {
        console.log(
          "🛑 CANCEL STOP STREAM",
        );

        streamRef.current
          .getTracks()
          .forEach((track) => {
            console.log(
              "🛑 CANCEL TRACK:",
              track.kind,
              track.readyState,
            );

            try {
              track.stop();
            } catch {
              // ignorar
            }
          });

        streamRef.current =
          null;
      }

      // -----------------------------
      // VIDEO
      // -----------------------------

      const video =
        videoRef.current;

      if (video) {
        const stream =
          video.srcObject;

        if (
          stream instanceof MediaStream
        ) {
          console.log(
            "🛑 CANCEL VIDEO STREAM",
          );

          stream
            .getTracks()
            .forEach((track) => {
              console.log(
                "🛑 CANCEL VIDEO TRACK:",
                track.kind,
                track.readyState,
              );

              try {
                track.stop();
              } catch {
                // ignorar
              }
            });
        }

        try {
          video.pause();
        } catch {
          // ignorar
        }

        video.srcObject = null;
      }

      console.log(
        "📷 CAMARA DETENIDA - CERRANDO SCANNER",
      );
    };

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-lg bg-black">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="block h-auto w-full"
        />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-24 w-72 rounded-md border-2 border-white/80" />
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Apuntá la cámara al código de barras EAN-13
      </p>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}